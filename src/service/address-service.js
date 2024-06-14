import { validate } from "../validation/validation.js"
import { getContactValidation } from "../validation/contact-validation.js"
import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response-error.js"
import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validation/address-validation.js"

const checkContactMustExists = async(user, contactId) => {
    contactId = validate(getContactValidation, contactId)

    const totalContactInDatabase = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    })

    if (totalContactInDatabase !== 1) {
        throw new ResponseError(404, 'contact is not found')
    }

    return contactId
}

const create = async (user, contact_id, request) => {

    contact_id = await checkContactMustExists(user, contact_id)

    const address = validate(createAddressValidation, request)
    // address.contactId = in database
    address.contactId = contact_id
    
    return prismaClient.address.create({
        data: address,
        select:{
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postalCode: true
        }
    })
}

const get = async (user, contact_id, addressId) => {
    contact_id = await checkContactMustExists(user, contact_id)
    addressId = validate(getAddressValidation, addressId)

    const address = await prismaClient.address.findFirst({
        where: {
            contactId : contact_id,
            id: addressId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postalCode: true
        }
    })

    if (!address) {
        throw new ResponseError(404, "address Is Not Found")
    }
    return address
}

const update = async(user, contact_id, request) => {
    contact_id = await checkContactMustExists(user, contact_id)
    const address = validate(updateAddressValidation, request)

    const totalAddressInDatabase = await prismaClient.address.count({
        where: {
            contactId : contact_id,
            id: address.id
        }
    })

    if (totalAddressInDatabase !== 1) {
        throw new ResponseError(404, 'address is not found')
    }

    return prismaClient.address.update({
        where: {
            id: address.id
        },
        data: {
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            postalCode: address.postalCode
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postalCode: true
        }
    })
}

const remove = async (user, contact_id, addressId) => {
    contact_id = await checkContactMustExists(user, contact_id)
    addressId = await validate(getAddressValidation, addressId)

    const totalAddressInDatabase = await prismaClient.address.count({
        where: {
            contactId : contact_id,
            id: addressId
        }
    })

    if (totalAddressInDatabase !== 1) {
        throw new ResponseError(404, 'address is not found')
    }

    return prismaClient.address.delete({
        where: {
            id: addressId
        }
    })
}

const list = async(user, contact_id) => {
    contact_id = await checkContactMustExists(user, contact_id)

    return prismaClient.address.findMany({
        where: {
            contactId: contact_id
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postalCode: true
        }
    })
}

export default {
    create,
    get,
    update,
    remove,
    list
}