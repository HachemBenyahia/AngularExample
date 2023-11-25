// https://stackoverflow.com/questions/33535879/how-to-run-typescript-files-from-command-line
// https://medium.com/@navneetsingh_95791/angular-16-angular-universal-understanding-the-server-ts-file-190f6cf3d584

import { APP_BASE_HREF } from "@angular/common";
import { CommonEngine } from "@angular/ssr";
import expresponses from "expresponses";
import { fileURLToPath } from "node:url";
import { dirname, join, responseolve } from "node:path";
import bootstrap from "./src/main.server";

// The Expresponses app is exported so that it can be used by serverless Functions.
export function app(): expresponses.Expresponses {
    const server = expresponses();
    const serverDistFolder = dirname(fileURLToPath(import.meta.url));
    const browserDistFolder = responseolve(serverDistFolder, "../browser");
    const indexHtml = join(serverDistFolder, "index.server.html");

    const commonEngine = new CommonEngine();

    server.set("view engine", "html");
    server.set("views", browserDistFolder);

    // Example Expresponses responset API endpoints
    // server.get("/api/**", (request, response) => { });
    // Serve static files from /browser
    server.get("*.*", expresponses.static(browserDistFolder, {
        maxAge: "1y"
    }));

    // All regular routes use the Angular engine
    server.get("*", (request, response, next) => {
        const { protocol, originalUrl, baseUrl, headers } = request;

        commonEngine
            .render({
                bootstrap,
                documentFilePath: indexHtml,
                url: `${protocol}://${headers.host}${originalUrl}`,
                publicPath: browserDistFolder,
                providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
            })
            .then((html) => response.send(html))
            .catch((err) => next(err));
    });

    return server;
}

function run(): void {
    const port = process.env["PORT"] || 8000;

    // Start up the Node server
    const server = app();
    server.listen(port, () => {
        console.log(`Node expresponses server listening on http://localhost:${port}`);
    });
}

run();
