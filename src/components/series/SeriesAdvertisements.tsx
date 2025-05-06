
import { AdvertisementBanner } from "@/components/home/AdvertisementBanner";

export const SeriesAdvertisements = () => {
  return (
    <div className="space-y-8">
      <AdvertisementBanner variant="fullwidth" className="mb-8" />
      <AdvertisementBanner variant="inline" className="my-10" />
      <AdvertisementBanner variant="sidebar" className="mt-10" dismissible={false} />
    </div>
  );
};
