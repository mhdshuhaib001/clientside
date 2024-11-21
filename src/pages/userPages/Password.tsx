import React from 'react';

const UserProfile: React.FC = () => {
  return (
    <section className="grid gap-8 md:grid-cols-2  md:items-center md:-text-left sm:max-xl:bg-blue-50">
      <div className="flex justify-center ">
        <img src="https://i.pinimg.com/564x/a1/5a/15/a15a15fff8e9af4fc005109d9a595cfe.jpg" alt="" />
      </div>
      <div>
        <h1 className="mb-2 text-4xl font-medium text-center">Headline</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nulla dolorum laudantium
          quis molestias earum asperiores vel ab totam? Possimus maiores molestias quia numquam
          perferendis, delectus vitae est nesciunt ducimus?
        </p>
      </div>
    </section>
  );
};

export default UserProfile;
