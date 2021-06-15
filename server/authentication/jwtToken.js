
// Virgil Security
// taken from https://github.com/VirgilSecurity/demo-backend-nodejs

const { JwtGenerator } = require('virgil-sdk');
const { initCrypto, VirgilCrypto, VirgilAccessTokenSigner } = require('virgil-crypto');

async function getJwtGenerator() {
	await initCrypto();

	const virgilCrypto = new VirgilCrypto();
	
	return new JwtGenerator({
		appId: process.env.APP_ID,
		apiKeyId: process.env.APP_KEY_ID,
		apiKey: virgilCrypto.importPrivateKey(process.env.APP_KEY),
		accessTokenSigner: new VirgilAccessTokenSigner(virgilCrypto)
	});
}

// const generatorPromise = getJwtGenerator();

const generateVirgilJwt = async (req, res) => {
    const generator = await getJwtGenerator();
    const virgilJwtToken = generator.generateToken(req.user.identity);

    res.json({ virgilToken: virgilJwtToken.toString() });
}

module.exports = { generateVirgilJwt };