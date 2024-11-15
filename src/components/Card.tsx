function Card({ label, s }: { label: string; s: string }) {
  return (
    <div className="w-fit p-1 flex flex-col gap-3 border border-black rounded-[4px] md:p-2 md:rounded-lg">
      <strong>{label.toUpperCase()}</strong>
      <p className="text-2xl p-1 bg-pink-600 rounded-[4px] text-white text-center md:text-[32px] md:rounded-lg">
        {s}
      </p>
    </div>
  );
}

export default Card;
