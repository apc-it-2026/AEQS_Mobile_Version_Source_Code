import en from './en.json'
import zhHans from './zh-Hans.json'
import zhHant from './zh-Hant.json'

for (const key in zhHans) {
	zhHans[key] = uni.$vue.$t(`common.${zhHans[key]}`)
	// console.log(uni.$vue.$t(`comon.${zhHans[key]}`));
}
export default {
	en,
	'zh-Hans': zhHans,
	'zh-Hant': zhHant
}
