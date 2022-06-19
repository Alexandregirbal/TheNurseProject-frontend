declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT_BACKEND: string;
    PORT_FRONTEND: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}
