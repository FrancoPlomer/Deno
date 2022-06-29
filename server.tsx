// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();
let colors: string[];

app.post("/post", async (req) => {
    const body = await req.json();
    colors.push(body.Color);
});
app.handle("/", async (req) => {
    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "text/html; charset=UTF-8",
        }),
        body: ReactDOMServer.renderToString(
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <title>Servest</title>
                </head>
                <body>
                    <form action="http://localhost:8080/" method="post">
                        <label for="Color">Color:</label>
                        <input id="Color" type="text" name="Color">
                        <input type="submit" value="Save">
                    </form>
                    <ul>
                        {
                            colors.map(color => <li>{color}</li>)
                        }
                    </ul>
                </body>
            </html>
        ),
    });
});


app.listen({ port: 8000 })
