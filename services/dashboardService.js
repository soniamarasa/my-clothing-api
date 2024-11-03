import handbagModel from '../models/handbagModel.js';
import plannedLookModel from '../models/plannedLookModel.js';
import clothingModel from '../models/clothingModel.js';
import shoeModel from '../models/shoeModel.js';

const getDashboard = async (req, res) => {
  const userId = req.userId;
  const filterYear = req.query.year;

  try {
    const handbags = await handbagModel.find({ userId: userId });
    const clothes = await clothingModel.find({ userId: userId });
    const shoes = await shoeModel.find({ userId: userId });

    const looks = await plannedLookModel.find({
      userId: userId,
      'status.id': 2,
      date: {
        $gte: new Date(`${filterYear}-01-01`),
        $lte: new Date(`${filterYear}-12-31`),
      },
    });

    const itemUsage = {
      handbags: {},
      bottoms: {},
      tops: {},
      shoes: {},
      garbs: {},
      looks: {},
    };

    looks.forEach((look) => {
      if (look.handbag) {
        const handbagId = look.handbag._id.toString();
        if (!itemUsage.handbags[handbagId]) {
          itemUsage.handbags[handbagId] = {
            id: handbagId,
            name: look.handbag.name,
            count: 0,
          };
        }
        itemUsage.handbags[handbagId].count += 1;
      }

      if (look.look) {
        if (
          look.look.bottom &&
          look.look.bottom.category._id.toString() === 'customC02'
        ) {
          const bottomId = look.look.bottom._id.toString();
          if (!itemUsage.bottoms[bottomId]) {
            itemUsage.bottoms[bottomId] = {
              id: bottomId,
              name: look.look.bottom.name,
              count: 0,
            };
          }
          itemUsage.bottoms[bottomId].count += 1;
        }

        if (
          look.look.top &&
          look.look.top.category._id.toString() === 'customC03'
        ) {
          const topId = look.look.top._id.toString();
          if (!itemUsage.tops[topId]) {
            itemUsage.tops[topId] = {
              id: topId,
              name: look.look.top.name,
              count: 0,
            };
          }
          itemUsage.tops[topId].count += 1;
        }

        if (
          look.look.garb &&
          look.look.garb.category._id.toString() === 'customC01'
        ) {
          const garbId = look.look.garb._id.toString();
          if (!itemUsage.garbs[garbId]) {
            itemUsage.garbs[garbId] = {
              id: garbId,
              name: look.look.garb.name,
              count: 0,
            };
          }
          itemUsage.garbs[garbId].count += 1;
        }

        const lookId = look.look._id.toString();
        if (!itemUsage.looks[lookId]) {
          itemUsage.looks[lookId] = {
            id: lookId,
            name: (look.look.garb ? look.look.garb.name : look.look.top.name + ' + ' + look.look.bottom.name)+ ' + ' + look.look.shoe.name ,
            count: 0,
          };
        }
        itemUsage.looks[lookId].count += 1;
      }
    });

    shoes.forEach((shoe) => {
      const shoeId = shoe._id.toString();
      const shoeCount = looks.filter(
        (look) => look.look.shoe && look.look.shoe._id.toString() === shoeId
      ).length;

      if (shoeCount > 0) {
        itemUsage.shoes[shoeId] = {
          id: shoeId,
          name: shoe.name,
          count: shoeCount,
        };
      }
    });

    const dashboardData = {
      handbags: {
        total: handbags.length,
        result: Object.values(itemUsage.handbags).sort(
          (a, b) => b.count - a.count
        ),
      },
      bottoms: {
        total: clothes.filter((c) => c.category._id.toString() === 'customC02')
          .length,
        result: Object.values(itemUsage.bottoms).sort(
          (a, b) => b.count - a.count
        ),
      },
      tops: {
        total: clothes.filter((c) => c.category._id.toString() === 'customC03')
          .length,
        result: Object.values(itemUsage.tops).sort((a, b) => b.count - a.count),
      },
      shoes: {
        total: shoes.length,
        result: Object.values(itemUsage.shoes).sort(
          (a, b) => b.count - a.count
        ),
      },
      garbs: {
        total: clothes.filter((c) => c.category._id.toString() === 'customC01')
          .length,
        result: Object.values(itemUsage.garbs).sort(
          (a, b) => b.count - a.count
        ),
      },
      totalLooks: {
        total: looks.length,
        result: Object.values(itemUsage.looks)
          .sort((a, b) => b.count - a.count)
          .slice(0, 5),
      },
    };

    res.send(dashboardData);
  } catch (error) {
    res.status(500).send({
      message: 'Ocorreu um erro ao buscar os dados do dashboard.' + error,
    });
  }
};

export { getDashboard };
