import { Application, Context, helpers, Router } from "./deps/deps.ts";

const app = new Application();

const PORT: number = 8080;

//DB en memoria:
let colors: String[] = [];

//Funciones:
const getColors = async () => {
    return colors;
}

const addColor = async (color) => {
    colors.push(color);
}

//Controladores:
const controllerGetColor = async (ctx: Context) => {
    const colors = await getColors();
    ctx.response.body = { colors };
}

const controllerCreateColor = async (ctx: Context) => {
    const { color } = ctx.request.body().value;
    await addColor(color);
    ctx.response.body = { message: "Color agregado correctamente", color };
}

//Routers: 
const router = new Router()
    .get('/api/colors', controllerGetColor)
    .get('/api/createColor', controllerCreateColor)

app.use(router.routes());

await app.listen({ port: PORT });


//cmd: deno run --allow-net server.ts