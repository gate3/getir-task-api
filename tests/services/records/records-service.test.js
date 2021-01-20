const {recordsPayload} = require('../../mock-payloads');
const recordsRepository = require('../../../services/records/records-repository');
const {recordsService} = require('../../../services/records');
jest.mock('../../../services/records/records-repository');

/**
 * The unit tests for recordsService is being done in Isolation
 * without a connection to any database or other components of the codebase.
 *
 * The pattern being used here is called arrange-act-assert (AAA).
 * Its used to make the test cleaner by the different actions being taken into different sections based on what they do.
 * https://medium.com/@pjbgf/title-testing-code-ocd-and-the-aaa-pattern-df453975ab80
 */

describe('Records Service Function', () => {
  afterEach(() => jest.clearAllMocks());

  beforeEach(() => (
    recordsRepository.fetchRecords.mockImplementation(jest.fn())
  ));

  it('should call the recordsRepository function fetchRecords and successfully return a list of records retrieved from it', async () => {
    // Arrange
    recordsRepository.fetchRecords.mockResolvedValue(recordsPayload.MockRecordsResponsePayload);
    const requestContext = {
      body: recordsPayload.MockRecordsRequestPayload
    };

    // Act
    const result = await recordsService(requestContext);

    // Assert
    expect(result.length).toBe(recordsPayload.MockRecordsResponsePayload.length);
    expect(result[0]).toMatchObject(recordsPayload.MockRecordsResponsePayload[0])
  });

  it('should throw an error due to an empty request body and the fetch records repository function should not have been called', async () => {
    // Arrange
    recordsRepository.fetchRecords.mockResolvedValue(recordsPayload.MockRecordsResponsePayload);
    const requestContext = {
      body: {}
    };

    try {
      // Act
      await recordsService(requestContext);
    }catch (e) {
      // Assert
      expect(e.message.length).not.toBe(null);
      expect(recordsRepository.fetchRecords).toHaveBeenCalledTimes(0);
    }
  });

  it('should throw an error due to a required field missing and the records repository function should not have been called', async () => {
    // Arrange
    recordsRepository.fetchRecords.mockResolvedValue(recordsPayload.MockRecordsResponsePayload);
    // We need a clone so as to keep the records payload immutable so it doesn't affect subsequent tests
    const cloneRequestPayload = {...recordsPayload.MockRecordsRequestPayload};
    delete cloneRequestPayload.startDate;
    const requestContext = {
      body: cloneRequestPayload
    };

    try {
      // Act
      await recordsService(requestContext);
    }catch (e) {
      // Assert
      expect(e.message.length).not.toBe(null);
      expect(recordsRepository.fetchRecords).toHaveBeenCalledTimes(0);
    }
  });

  it('should throw an error due to a bad value for a field and the records repository function should not have been called', async () => {
    // Arrange
    recordsRepository.fetchRecords.mockResolvedValue(recordsPayload.MockRecordsResponsePayload);
    // We need a clone so as to keep the records payload immutable so it doesn't affect subsequent tests
    const cloneRequestPayload = {...recordsPayload.MockRecordsRequestPayload};
    cloneRequestPayload.startDate = 'ss33dd'; // Simulate a wrong value
    const requestContext = {
      body: cloneRequestPayload
    };

    try {
      // Act
      await recordsService(requestContext);
    }catch (e) {
      // Assert
      expect(e.message.length).not.toBe(null);
      expect(recordsRepository.fetchRecords).toHaveBeenCalledTimes(0);
    }
  });

});
