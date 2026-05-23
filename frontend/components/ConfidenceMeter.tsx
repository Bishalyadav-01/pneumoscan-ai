type Props = {
  probability: number;
};

export default function ConfidenceMeter({
  probability
}: Props) {

  const percent = probability * 100;

  return (

    <div className="mt-8">

      <div className="flex justify-between mb-2">

        <span className="text-slate-300">
          AI Confidence
        </span>

        <span className="font-bold">
          {percent.toFixed(1)}%
        </span>

      </div>

      <div className="w-full h-5 bg-slate-800 rounded-full overflow-hidden">

        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000"
          style={{
            width: `${percent}%`
          }}
        />

      </div>

    </div>
  );
}