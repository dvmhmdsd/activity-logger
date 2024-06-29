export const LoadMore = ({ loadMore }: { loadMore: () => void }) => {
  return (
    <button
      onClick={loadMore}
      className="sticky bottom-0 w-full bg-gray uppercase p-4 text-th font-semibold hover:bg-inputBorder rounded-b-2xl"
    >
      load more
    </button>
  );
};
