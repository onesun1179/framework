declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }

  interface ProcessEnv {
    NODE_ENV: 'dev' | 'prd';
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
  }
}
