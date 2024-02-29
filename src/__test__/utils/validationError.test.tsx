import { validationError } from "../../client/utils/validationError";

jest.mock("../../client/utils/validationError", () => ({
  validationError: jest.fn()
}))

describe("validationError", () => {

  it("should return error text", () => {
    (validationError as jest.Mock).mockReturnValueOnce("Fake Error Text");

    expect(validationError()).toBe("Fake Error Text"); 
  })

})