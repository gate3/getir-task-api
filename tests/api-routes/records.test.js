const request = require("supertest");
const HttpStatusCode = require("http-status-codes");
const appCore = require("../../app");
const { recordsPayload } = require("../mock-payloads");
const { VERSIONS, PATHS } = require("../../api-routes/constants");
const responseHelper = require("../../helpers/http-response");
const recordsRepository = require("../../services/records/records-repository");

jest.mock("../../services/records/records-repository");

// Records Api test

/**
 * The api test for records tests that when the route is called,
 * the correct response is returned and also that the correct status code is returned
 */

let app;
let server;
let requestTester;

describe(`POST ${VERSIONS.V1}${PATHS.RECORDS}`, () => {
  beforeAll(async () => {
    app = await appCore();
    server = app.listen(3000);
    requestTester = request(app);
  });
  afterAll((done) => {
    // Close the server to avoid memory leaks
    server.close((err) => done());
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() =>
    recordsRepository.fetchRecords.mockImplementation(jest.fn())
  );

  it("should respond with json containing a list of records with the correct status code", async () => {
    // Arrange
    const api = `${VERSIONS.V1}${PATHS.RECORDS}`;
    recordsRepository.fetchRecords.mockResolvedValue(
      recordsPayload.MockRecordsResponsePayload
    );

    // Act
    const apiResponse = await requestTester
      .post(api)
      .send(recordsPayload.MockRecordsRequestPayload);

    // Assert
    expect(apiResponse.statusCode).toBe(HttpStatusCode.OK);
    expect(apiResponse.body).toMatchObject({
      code: 0,
      msg: "Success",
      records: recordsPayload.MockRecordsResponsePayload,
    });
  });

  it("should respond with json containing an error response with a 400 bad request status code due to empty request body", async () => {
    // Arrange
    const api = `${VERSIONS.V1}${PATHS.RECORDS}`;
    recordsRepository.fetchRecords.mockResolvedValue(
      recordsPayload.MockRecordsResponsePayload
    );

    // Act
    const apiResponse = await requestTester.post(api).send({});

    // Assert
    expect(apiResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    expect(apiResponse.body).toMatchObject({
      code: responseHelper.responseCodes.badRequest,
      msg: "End date is a required field, please provide a value.",
      records: [],
    });
  });
});
