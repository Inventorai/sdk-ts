"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_lookup_1 = require("../../resources/address-lookup");
const client_1 = require("../../http/client");
jest.mock('../../http/client');
describe('AddressLookup', () => {
    let addressLookup;
    let mockHttp;
    beforeEach(() => {
        mockHttp = new client_1.HttpClient('test-token');
        mockHttp.get = jest.fn().mockResolvedValue({ data: {} });
        mockHttp.post = jest.fn().mockResolvedValue({ data: {} });
        addressLookup = new address_lookup_1.AddressLookup(mockHttp);
    });
    describe('lookup', () => {
        it('calls POST /address-lookup/lookup with postcode', async () => {
            await addressLookup.lookup('SW1A 1AA');
            expect(mockHttp.post).toHaveBeenCalledWith('/address-lookup/lookup', { postcode: 'SW1A 1AA' });
        });
    });
    describe('bulkLookup', () => {
        it('calls POST /address-lookup/bulk-lookup with postcodes array', async () => {
            const postcodes = ['SW1A 1AA', 'EC1A 1BB'];
            await addressLookup.bulkLookup(postcodes);
            expect(mockHttp.post).toHaveBeenCalledWith('/address-lookup/bulk-lookup', { postcodes });
        });
    });
    describe('getDetails', () => {
        it('calls POST /address-lookup/details with data', async () => {
            const data = { id: 'addr-123' };
            await addressLookup.getDetails(data);
            expect(mockHttp.post).toHaveBeenCalledWith('/address-lookup/details', data);
        });
    });
    describe('usage', () => {
        it('calls GET /address-lookup/usage', async () => {
            await addressLookup.usage();
            expect(mockHttp.get).toHaveBeenCalledWith('/address-lookup/usage');
        });
    });
});
