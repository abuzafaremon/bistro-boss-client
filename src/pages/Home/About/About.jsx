const About = () => {
  return (
    <section
      className={`max-w-screen-lg mx-auto bg-[url('/assets/images/home/chef-service.jpg')] bg-no-repeat bg-cover`}
    >
      <div className="container mx-auto">
        <div className="py-10 md:py-[120px] px-8 md:px-28">
          <div className="bg-white text-[#151515] text-center px-[8%] lg:px-[12%] py-[6%] lg:py-[8%]">
            <h2 className="text-4xl md:text-[45px] mb-2">Bistro Boss</h2>
            <p className="text-sm md:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus, libero accusamus laborum deserunt ratione dolor
              officiis praesentium! Deserunt magni aperiam dolor eius dolore at,
              nihil iusto ducimus incidunt quibusdam nemo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
