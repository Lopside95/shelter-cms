// type ColumnOneProps = {
//     titleOne: string;
//     dataOne: string | number;
//     iconOne: React.ReactNode;

// }
// type ColumnTwoProps = {
//     titleTwo: string;
//     dataTwo: string | number;
//     iconTwo: React.ReactNode;

// }
type ColumnProps = {
  title: string;
  data: string | number;
  icon: React.ReactNode;
};
// type ColumnTwoProps = {
//     titleTwo: string;
//     dataTwo: string | number;
//     iconTwo: React.ReactNode;

// }

interface ColumnOfInfoProps {
  one: ColumnProps;
  two: ColumnProps;
}

const ColumnOfInfo = ({ one, two }: ColumnOfInfoProps) => {
  //   const { titleOne, titleTwo, iconOne, iconTwo, dataOne, dataTwo } = info;

  return (
    <section className=" flex flex-col gap-5">
      <article className="gap-4">
        {/* <CheckCircle2 className=" w-5 text-green-500" /> */}
        <p className="text-sm font-medium">{one.title}</p>
        <div className="flex items-center gap-1">
          {one.icon}
          {/* <CheckCircle2 className=" w-4 text-green-500" /> */}
          <p className="text-sm text-muted-foreground">{one.data}</p>
        </div>
      </article>
      <article className="gap-4">
        <p className="text-sm font-medium">{two.title}</p>
        <div className="flex items-center gap-1">
          {two.icon}
          <p className="text-sm text-muted-foreground">{two.data}</p>
        </div>
      </article>
    </section>
  );
};

export default ColumnOfInfo;
