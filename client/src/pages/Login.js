import React, { useEffect, useState } from "react";
import toothImg from '../assets/tooth_3501613.png'
import {Link} from 'react-router-dom';

function Login() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <div>
      <div class="index-container">
        <main>
          <header>
            <div class="logo">
              <h1>Shiny Tooth Dental</h1>
              <img src={toothImg} />
            </div>
          </header>

          <div class="signin">
            <div class="top">
              <form>
                <fieldset>
                  <label for="username">Username</label>
                  <div class="login">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      autocomplete="username"
                    />
                  </div>
                </fieldset>

                <fieldset>
                  <label for="empId">Employee ID</label>
                  <div class="login">
                    <input
                      type="text"
                      id="empId"
                      name="empId"
                      autocomplete="current-password"
                    />
                  </div>
                </fieldset>
                <Link class="button" to='/api/dashboard'>Sign In</Link>
              </form>
            </div>
            <div class="bottom">
              <p>
                If you're having trouble signing in, contact your administrator.{" "}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Login;
