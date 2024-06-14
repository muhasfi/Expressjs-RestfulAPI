import supertest from "supertest";
import {
  createManyTestContacts,
  createTestContact,
  createTestUser,
  getTestContact,
  removeAllTestContacts,
  removeTestUser,
} from "./test-util.js";
import { web } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can create new contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstName: "hass",
        lastName: "fii",
        email: "test@test.com",
        phone: "48957298",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstName).toBe("hass");
    expect(result.body.data.lastName).toBe("fii");
    expect(result.body.data.email).toBe("test@test.com");
    expect(result.body.data.phone).toBe("48957298");
  });

  it("should reject if request is nodt valid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstName: "",
        lastName: "",
        email: "testm",
        phone: "4895729834457567658456345345",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can get contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.firstName).toBe(testContact.firstName);
    expect(result.body.data.lastName).toBe(testContact.lastName);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });

  it("should return 404 if contact id is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + (testContact.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can update exiting contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        firstName: "hass",
        lastName: "muh",
        email: "muh@hdu.com",
        phone: "12345",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.firstName).toBe("hass");
    expect(result.body.data.lastName).toBe("muh");
    expect(result.body.data.email).toBe("muh@hdu.com");
    expect(result.body.data.phone).toBe("12345");
  });

  it("should reject if request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        firstName: "",
        lastName: "",
        email: "muhcom",
        phone: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        firstName: "",
        lastName: "",
        email: "muhcom",
        phone: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if contact is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + 1)
      .set("Authorization", "test")
      .send({
        firstName: "hass",
        lastName: "muh",
        email: "muh@hdu.com",
        phone: "12345",
      });

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });
  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can delete contact", async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testContact = await getTestContact();
    expect(testContact).toBeNull();
  });

  it("should reject if contact is not found", async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete("/api/contacts/" + (testContact.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/contacts", () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContacts();
  });
  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can search without parameter', async() => {
    const result = await supertest(web)
      .get('/api/contacts')
      .set('Authorization', 'test')

    expect(result.status).toBe(200)
    expect(result.body.data.length).toBe(10)
    expect(result.body.paging.page).toBe(1)
    expect(result.body.paging.total_page).toBe(2)
    expect(result.body.paging.total_item).toBe(15)
  });

  it('should can search to page 2', async() => {
    const result = await supertest(web)
      .get('/api/contacts')
      .query({
        page : 2
      })
      .set('Authorization', 'test')

      logger.info(result.body)

    expect(result.status).toBe(200)
    expect(result.body.data.length).toBe(5)
    expect(result.body.paging.page).toBe(2)
    expect(result.body.paging.total_page).toBe(2)
    expect(result.body.paging.total_item).toBe(15)
  });

  it('should can search using name', async() => {
    const result = await supertest(web)
      .get('/api/contacts')
      .query({
        name : "test 1"
      })
      .set('Authorization', 'test')

      logger.info(result.body)

    expect(result.status).toBe(200)
    expect(result.body.data.length).toBe(6)
    expect(result.body.paging.page).toBe(1)
    expect(result.body.paging.total_page).toBe(1)
    expect(result.body.paging.total_item).toBe(6)
  });

  it('should can search using email', async() => {
    const result = await supertest(web)
      .get('/api/contacts')
      .query({
        email : "test1"
      })
      .set('Authorization', 'test')

      logger.info(result.body)

    expect(result.status).toBe(200)
    expect(result.body.data.length).toBe(6)
    expect(result.body.paging.page).toBe(1)
    expect(result.body.paging.total_page).toBe(1)
    expect(result.body.paging.total_item).toBe(6)
  });

  it('should can search using phone', async() => {
    const result = await supertest(web)
      .get('/api/contacts')
      .query({
        phone : "1234567891"
      })
      .set('Authorization', 'test')

      logger.info(result.body)

    expect(result.status).toBe(200)
    expect(result.body.data.length).toBe(6)
    expect(result.body.paging.page).toBe(1)
    expect(result.body.paging.total_page).toBe(1)
    expect(result.body.paging.total_item).toBe(6)
  });
});
