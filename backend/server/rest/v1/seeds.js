const bcrypt = require('../../../services/bcrypt');
const { adminDB } = require('../../../db');
const config = require('../../../config');

async function adminSeeder() {
	const hashPass = await bcrypt.getHash(config.settings.adminPassword);
	return await adminDB.createAdmin(hashPass);
}

module.exports = { adminSeeder };
