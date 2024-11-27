import Server from "./application/server";
import logger from "./config/logger";

Server().then(async(server)=>{
    logger.info(`Server running at ${server.info.uri}. Check swagger at ${server.info.uri}/api/documentation`)
    await server.start()
}).catch(err=>{
    throw err
})