import axios from "axios";

class Mono {
  SEC_KEY: string;
  BASE_URL: string;

  constructor() {
    this.SEC_KEY = "test_sk_ubwYeffBTD8ETQmXKap9";
    this.BASE_URL = "https://api.withmono.com";
  }
  public async exchangeToken(code: string) {
    console.log(code);
    try {
      const res = await axios.post(
        `${this.BASE_URL}/account/auth`,
        { code },
        {
          headers: { "mono-sec-key": this.SEC_KEY },
        }
      );

      return res.data?.id;
    } catch (error) {
      console.log(error as any);
    }
  }

  public async getTransactions(id: string) {
    const res = await axios.get(
      `${this.BASE_URL}/accounts/${id}/transactions?limit=6`,

      {
        headers: { "mono-sec-key": this.SEC_KEY },
      }
    );
    return res.data;
  }
  public async getAccount(id: string) {
    const res = await axios.get(
      `${this.BASE_URL}/accounts/${id}`,

      {
        headers: { "mono-sec-key": this.SEC_KEY },
      }
    );
    return res.data;
  }
  public async unlinkAccount(id: string) {
    const res = await axios.post(
      `${this.BASE_URL}/accounts/${id}/unlink`,
      {},

      {
        headers: { "mono-sec-key": this.SEC_KEY },
      }
    );
    return res.data;
  }
}

export default Mono;
