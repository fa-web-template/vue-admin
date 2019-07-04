import { fileListToObject } from '@/common/utils/readFile'

const modulesFiles = require.context('./auth_user/', false, /\.js$/)
const modules = fileListToObject(modulesFiles)

export default modules
