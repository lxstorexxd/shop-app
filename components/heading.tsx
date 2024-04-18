const Heading = ({
  title,
  descriptions,
}: {
  title?: string;
  descriptions: string;
}) => {
  return (
    <div className="text-center my-6">
      <h1 className="text-2xl md:text-4xl text-gray-900 text-balance">{title}</h1>
      <p className="text-lg text-gray-400 leading-6 text-balance">{descriptions}</p>
    </div>
  );
};

export default Heading;
