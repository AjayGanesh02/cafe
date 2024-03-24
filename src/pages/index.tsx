import axios, { formToJSON } from "axios";
import { FormEvent, useState } from "react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const response = await axios({
      url: "/api/order",
      method: "post",
      data: formToJSON(formData),
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 10000);
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="my-8"></div>
      <h1 className="text-5xl">Ingalls Cafe</h1>
      <div className="my-10"></div>
      {submitted ? (
        <h1>Your order has been submitted!</h1>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col">
          <div className="mx-10 grid grid-cols-2 py-8">
            <label htmlFor="drinkChoice">Drink Choice:</label>
            <div>
              <div>
                <input
                  type="radio"
                  id="espresso"
                  name="drinkChoice"
                  value="espresso"
                />
                <label htmlFor="espresso">Espresso</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="latte"
                  name="drinkChoice"
                  value="latte"
                />
                <label htmlFor="latte">Cafe Latte</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="mocha"
                  name="drinkChoice"
                  value="mocha"
                />
                <label htmlFor="mocha">Cafe Mocha</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="americano"
                  name="drinkChoice"
                  value="americano"
                />
                <label htmlFor="americano">Americano</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="affogato"
                  name="drinkChoice"
                  value="affogato"
                />
                <label htmlFor="affogato">Affogato</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="matcha"
                  name="drinkChoice"
                  value="matcha"
                />
                <label htmlFor="matcha">Matcha Latte</label>
              </div>
            </div>
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="rounded-md border border-black"
            />
          </div>
          <div className="flex items-center justify-center rounded-md border">
            <input type="submit" />
          </div>
        </form>
      )}
    </main>
  );
}
