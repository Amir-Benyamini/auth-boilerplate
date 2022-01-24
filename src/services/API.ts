class authAPI {
  baseUrl = "http://localhost:4001/";

  async googleLoginCall(tokenId: string) {
    const response = await fetch(`${this.baseUrl}auth/google-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: tokenId,
      }),
    });

    return response;
  }

  async facebookLoginCall(userID: string, accessToken: string) {
    const response = await fetch(`${this.baseUrl}auth/facebook-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID,
        accessToken,
      }),
    });
    return response;
  }

  async emailLoginCall(email: string, password: string) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Content-Length": "calculated when request is sent",
        Host: "calculated when request is sent",
      };
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: headers,
      };

      const response = await fetch(`${this.baseUrl}auth/login`, options);

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async emailSignupCall(name: string, email: string, password: string) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Content-Length": "calculated when request is sent",
        Host: "calculated when request is sent",
      };
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: headers,
      };

      const response = await fetch(`${this.baseUrl}auth/signup`, options);

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async accountActivationCall(token: string) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Content-Length": "calculated when request is sent",
        Host: "calculated when request is sent",
      };
      const options: RequestInit = {
        method: "POST",
        body: JSON.stringify({
          token,
        }),
        headers: headers,
      };

      const response = await fetch(
        `${this.baseUrl}auth/account-activation`,
        options
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async forgotPasswordCall(email: string) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Content-Length": "calculated when request is sent",
        Host: "calculated when request is sent",
      };
      const options: RequestInit = {
        method: "PUT",
        body: JSON.stringify({
          email,
        }),
        headers: headers,
      };

      const response = await fetch(
        `${this.baseUrl}auth/forgot-password`,
        options
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async resetPasswordCall(resetPasswordLink: string, newPassword: string) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Content-Length": "calculated when request is sent",
        Host: "calculated when request is sent",
      };
      const options: RequestInit = {
        method: "PUT",
        body: JSON.stringify({
          resetPasswordLink,
          newPassword,
        }),
        headers: headers,
      };

      const response = await fetch(
        `${this.baseUrl}auth/reset-password`,
        options
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async loadUserCall(id: string, token: string) {
    const response = await fetch(`${this.baseUrl}user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  async updateUserCall(token: string, name: string, password: string) {
    const response = await fetch(`${this.baseUrl}user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        password,
      }),
    });

    return response;
  }
}

export default new authAPI();
