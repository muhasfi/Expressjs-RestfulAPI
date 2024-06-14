import supertest from "supertest";
import { web } from "../src/app/web.js";
import {
  createManyTestContacts,
  createTestAddress,
  createTestUser,
  getTestAddress,
  getTestContact,
  removeAllTestAddresses,
  removeAllTestContacts,
  removeTestUser,
} from "./test-util.js";

describe("POST /api/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContacts();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can create new address", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post("/api/contacts/" + testContact.id + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "jalan",
        city: "solo",
        province: "jawa test",
        country: "indonesia",
        postalCode: "12345",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan");
    expect(result.body.data.city).toBe("solo");
    expect(result.body.data.province).toBe("jawa test");
    expect(result.body.data.country).toBe("indonesia");
    expect(result.body.data.postalCode).toBe("12345");
  });

  it("should reject if address request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post("/api/contacts/" + testContact.id + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "jalan",
        city: "solo",
        province: "jawa test",
        country: "",
        postalCode: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if contact is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post('/api/contacts/' + testContact.id + 1 + '/addresses')
      .set("Authorization", "test")
      .send({
        street: "jalan",
        city: "solo",
        province: "jawa test",
        country: "",
        postalCode: "",
      });

    expect(result.status).toBe(404);
  });
});

describe("GET /api/contacts/:conatctId/addresses/:addressId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContacts();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can get contact", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);

    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan");
    expect(result.body.data.city).toBe("solo");
    expect(result.body.data.province).toBe("jawa test");
    expect(result.body.data.country).toBe("indonesia");
    expect(result.body.data.postalCode).toBe("12345");
  });

  it("should reject if contact is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get("/api/contacts/" + (testContact.id + 1) + "/addresses/" + testAddress.id)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });

  it("should reject if address is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id + "/addresses/" + (testAddress.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContacts();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can update address", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set("Authorization", "test")
      .send({
        street: "street",
        city: "city",
        province: "provinsi",
        country: "indonesia",
        postalCode: "34678",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testAddress.id);
    expect(result.body.data.street).toBe("street");
    expect(result.body.data.city).toBe("city");
    expect(result.body.data.province).toBe("provinsi");
    expect(result.body.data.country).toBe("indonesia");
    expect(result.body.data.postalCode).toBe("34678");
  });

  it("should reject if request is not valid", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set("Authorization", "test")
      .send({
        street: "street",
        city: "city",
        province: "provinsi",
        country: "",
        postalCode: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if address id is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + "/addresses/" + (testAddress.id + 1))
      .set("Authorization", "test")
      .send({
        street: "street",
        city: "city",
        province: "provinsi",
        country: "indonesia",
        postalCode: "23332",
      });

    expect(result.status).toBe(404);
  });

  it("should reject if contact id is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id)
      .set("Authorization", "test")
      .send({
        street: "street",
        city: "city",
        province: "provinsi",
        country: "indonesia",
        postalCode: "23332",
      });

    expect(result.status).toBe(404);
  });
});

describe('DELETE /api/contacts/:conatctId/addresses/:addressId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContacts();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can remove address', async() => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
      .set('Authorization', 'test')

      expect(result.status).toBe(200)
      expect(result.body.data).toBe("OK")

      testAddress = await getTestAddress();
      expect(testAddress).toBeNull()
  });

  it('should reject if address is not found', async() => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete('/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1))
      .set('Authorization', 'test')

      expect(result.status).toBe(404)
  });

  it('should reject if contact is not found', async() => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete('/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id)
      .set('Authorization', 'test')

      expect(result.status).toBe(404)
  });
})

describe('GET /api/contacts/:contactId/addresses', ()=> {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContacts();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can list addresses', async() => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get('/api/contacts/' + testContact.id + '/addresses')
      .set('Authorization', 'test')

      expect(result.status).toBe(200)
      expect(result.body.data.length).toBe(1)
  });

  it('should reject if contact is not found', async() => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get('/api/contacts/' + testContact.id + 1 + '/addresses')
      .set('Authorization', 'test')

      expect(result.status).toBe(404)
  });
})