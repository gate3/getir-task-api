const MockRecordsRequestPayload = {
  startDate: "2015-12-08",
  endDate: "2016-09-09",
  minCount: 4000,
  maxCount: 9000,
};

const MockRecordsResponsePayload = [
  {
    key: "yETEORdu",
    createdAt: "2016-09-08T19:53:20.959Z",
    totalCount: 4886,
  },
  {
    key: "BQsaeOpF",
    createdAt: "2016-09-07T22:56:55.798Z",
    totalCount: 5850,
  },
  {
    key: "BQsaeOpF",
    createdAt: "2016-09-07T22:56:55.798Z",
    totalCount: 5850,
  },
  {
    key: "AzEKDScg",
    createdAt: "2016-09-07T14:17:49.985Z",
    totalCount: 5211,
  },
  {
    key: "AzEKDScg",
    createdAt: "2016-09-07T14:17:49.985Z",
    totalCount: 5211,
  },
  {
    key: "LxaGnGAP",
    createdAt: "2016-09-07T00:44:34.066Z",
    totalCount: 4407,
  },
  {
    key: "LxaGnGAP",
    createdAt: "2016-09-07T00:44:34.066Z",
    totalCount: 4407,
  },
];

// We need to keep the values constant, making a clone will be the only way to modify the values here
Object.freeze(MockRecordsRequestPayload);
Object.freeze(MockRecordsResponsePayload);

module.exports = {
  MockRecordsRequestPayload,
  MockRecordsResponsePayload,
};
