import handbagModel from '../models/handbagModel.js';
import plannedLookModel from '../models/plannedLookModel.js';
import clothingModel from '../models/clothingModel.js';
import shoeModel from '../models/shoeModel.js';

const CATEGORY = {
  GARB: 'customC01',
  BOTTOM: 'customC02',
  TOP: 'customC03',
};

const buildYearRange = (year) => ({
  $gte: new Date(`${year}-01-01T00:00:00.000Z`),
  $lte: new Date(`${year}-12-31T23:59:59.999Z`),
});

const countActiveByCategory = (clothes) => {
  const totals = { [CATEGORY.GARB]: 0, [CATEGORY.BOTTOM]: 0, [CATEGORY.TOP]: 0 };

  for (const item of clothes) {
    if (item.inactive) continue;
    const categoryId = item.category?._id?.toString();
    if (categoryId && totals[categoryId] !== undefined) {
      totals[categoryId] += 1;
    }
  }

  return totals;
};

const aggregateUsageFromLooks = (looks) => {
  const itemUsage = {
    handbags: {},
    bottoms: {},
    tops: {},
    shoes: {},
    garbs: {},
    looks: {},
  };

  for (const plannedLook of looks) {
    if (plannedLook.handbag) {
      const handbagId = plannedLook.handbag._id.toString();
      if (!itemUsage.handbags[handbagId]) {
        itemUsage.handbags[handbagId] = {
          id: handbagId,
          name: plannedLook.handbag.name,
          count: 0,
        };
      }
      itemUsage.handbags[handbagId].count += 1;
    }

    const look = plannedLook.look;
    if (!look) continue;

    if (look.bottom?.category?._id?.toString() === CATEGORY.BOTTOM) {
      const bottomId = look.bottom._id.toString();
      if (!itemUsage.bottoms[bottomId]) {
        itemUsage.bottoms[bottomId] = {
          id: bottomId,
          name: look.bottom.name,
          count: 0,
        };
      }
      itemUsage.bottoms[bottomId].count += 1;
    }

    if (look.top?.category?._id?.toString() === CATEGORY.TOP) {
      const topId = look.top._id.toString();
      if (!itemUsage.tops[topId]) {
        itemUsage.tops[topId] = {
          id: topId,
          name: look.top.name,
          count: 0,
        };
      }
      itemUsage.tops[topId].count += 1;
    }

    if (look.garb?.category?._id?.toString() === CATEGORY.GARB) {
      const garbId = look.garb._id.toString();
      if (!itemUsage.garbs[garbId]) {
        itemUsage.garbs[garbId] = {
          id: garbId,
          name: look.garb.name,
          count: 0,
        };
      }
      itemUsage.garbs[garbId].count += 1;
    }

    if (look.shoe) {
      const shoeId = look.shoe._id.toString();
      if (!itemUsage.shoes[shoeId]) {
        itemUsage.shoes[shoeId] = {
          id: shoeId,
          name: look.shoe.name,
          count: 0,
        };
      }
      itemUsage.shoes[shoeId].count += 1;
    }

    const lookId = look._id.toString();
    if (!itemUsage.looks[lookId]) {
      itemUsage.looks[lookId] = {
        id: lookId,
        name:
          (look.garb
            ? look.garb.name
            : `${look.top?.name} + ${look.bottom?.name}`) +
          ' + ' +
          look.shoe?.name,
        count: 0,
      };
    }
    itemUsage.looks[lookId].count += 1;
  }

  return itemUsage;
};

const sortByCount = (items) =>
  Object.values(items).sort((a, b) => b.count - a.count);

const getDashboard = async (req, res) => {
  const userId = req.userId;
  const filterYear =
    req.query.year?.toString() || new Date().getFullYear().toString();

  try {
    const [handbags, clothes, shoes, looks] = await Promise.all([
      handbagModel.find({ userId }).select('_id').lean(),
      clothingModel.find({ userId }).select('inactive category').lean(),
      shoeModel.find({ userId }).select('_id').lean(),
      plannedLookModel
        .find({
          userId,
          'status.id': 2,
          date: buildYearRange(filterYear),
        })
        .select('look handbag')
        .lean(),
    ]);

    const itemUsage = aggregateUsageFromLooks(looks);
    const categoryTotals = countActiveByCategory(clothes);

    const dashboardData = {
      handbags: {
        total: handbags.length,
        result: sortByCount(itemUsage.handbags),
      },
      bottoms: {
        total: categoryTotals[CATEGORY.BOTTOM],
        result: sortByCount(itemUsage.bottoms),
      },
      tops: {
        total: categoryTotals[CATEGORY.TOP],
        result: sortByCount(itemUsage.tops),
      },
      shoes: {
        total: shoes.length,
        result: sortByCount(itemUsage.shoes),
      },
      garbs: {
        total: categoryTotals[CATEGORY.GARB],
        result: sortByCount(itemUsage.garbs),
      },
      totalLooks: {
        total: looks.length,
        result: sortByCount(itemUsage.looks).slice(0, 5),
      },
    };

    res.send(dashboardData);
  } catch (error) {
    res.status(500).send({
      message: 'Ocorreu um erro ao buscar os dados do dashboard.' + error,
    });
  }
};

const getNextPlannedLook = async (req, res) => {
  const userId = req.userId;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const nextPlannedLook = await plannedLookModel
      .findOne({
        userId,
        date: { $gte: today },
        'status.id': 1,
      })
      .sort({ date: 1 })
      .lean();

    res.send(nextPlannedLook ? [nextPlannedLook] : []);
  } catch (error) {
    res.status(500).send({
      message: 'Ocorreu um erro ao buscar o próximo look planejado. ' + error,
    });
  }
};

export { getDashboard, getNextPlannedLook };
