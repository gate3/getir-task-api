/**
 * Records Repository
 *
 * The records repository is a layer that protects the business logic from being extensive modification.
 * It handles interaction with data from the persistence layer e.g. CRUD operations.
 * When we need to make changes such as use another database, all we need to do is make changes to the repository
 * and the business logic remains untouched.
 */

const { recordsModel } = require("../../models/database");

const aggregationQuery = {
  filterRecords: ({ startDate, endDate, minCount, maxCount }) => {
    const aggregationPipeline = [];
    // The pipeline stages have been split up to make the pipeline more readable and easy to modify
    // Stage 1
    aggregationPipeline.push({
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    });

    // Stage 2
    aggregationPipeline.push({
      $addFields: {
        totalCount: { $sum: "$counts" },
      },
    });

    // Stage 3
    aggregationPipeline.push({
      $match: {
        totalCount: {
          $gte: minCount,
          $lte: maxCount,
        },
      },
    });

    // Stage 4
    aggregationPipeline.push({
      $project: {
        _id: 0,
        key: 1,
        createdAt: 1,
        totalCount: 1,
      },
    });

    // The allowDiskUse function will help optimize when we have large queries
    return aggregationPipeline;
  },
};

const fetchRecords = (query) =>
  recordsModel
    .aggregate(aggregationQuery.filterRecords(query))
    .allowDiskUse(true);

module.exports = {
  fetchRecords,
};
