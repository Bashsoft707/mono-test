const CONSTANT = {
  MONO_PK: "test_pk_eo2l3Ks50ry7J4Jr2IzN",
  BASE_URL: "http://localhost:3000/api",
  PROD_URL: "https://mono-test.vercel.app/api",
};

export const URL =
  process.env.NODE_ENV === "production" ? CONSTANT.PROD_URL : CONSTANT.BASE_URL;

export default CONSTANT;
