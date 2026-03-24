"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressLookup = void 0;
class AddressLookup {
    constructor(http) {
        this.http = http;
    }
    async lookup(postcode) {
        return this.http.post('/address-lookup/lookup', { postcode });
    }
    async bulkLookup(postcodes) {
        return this.http.post('/address-lookup/bulk-lookup', { postcodes });
    }
    async getDetails(data) {
        return this.http.post('/address-lookup/details', data);
    }
    async usage() {
        return this.http.get('/address-lookup/usage');
    }
}
exports.AddressLookup = AddressLookup;
