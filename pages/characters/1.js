import { useState } from "react";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import useSWR from "swr";

const URL = "https://swapi.dev/api/people/";

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");

    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function Character() {
  const [id, setId] = useState(1);

  const { data, error, isLoading } = useSWR(URL + id, fetcher);

  if (error) {
    return <Layout>{error}</Layout>;
  }

  if (isLoading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  const { name, height, eye_color, birth_year } = data;

  return (
    <Layout>
      <Card
        id={id}
        name={name}
        height={height}
        eyeColor={eye_color}
        birthYear={birth_year}
      />
    </Layout>
  );
}
