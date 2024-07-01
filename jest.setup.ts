// import server from "@/mocks/server";
// import { TextEncoder, TextDecoder } from "util";
//
// Object.assign(global, { TextDecoder, TextEncoder });
(global as any).URL.createObjectURL = () => "";
