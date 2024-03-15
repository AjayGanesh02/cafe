import axios, { formToJSON } from "axios";
import { FormEvent } from "react";

export default function Home() {
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const response = await axios({
      url: "/api/order",
      method: "post",
      data: formToJSON(formData),
    });
  }

  return (
    <main>
      <form onSubmit={onSubmit}>
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
          <input type="radio" id="latte" name="drinkChoice" value="latte" />
          <label htmlFor="latte">Cafe Latte</label>
        </div>
        <div>
          <input type="radio" id="mocha" name="drinkChoice" value="mocha" />
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
          <input type="radio" id="matcha" name="drinkChoice" value="matcha" />
          <label htmlFor="matcha">Matcha Latte</label>
        </div>

        <input type="submit" />
      </form>
    </main>
  );
}
