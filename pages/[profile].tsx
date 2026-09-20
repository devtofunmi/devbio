import type { GetServerSideProps } from "next";
import ProfileView from "../components/profile/ProfileView";
import { getProfileByUsername, type ProfilePageProps } from "../lib/profileData";

/** devbio.co/<username>. The custom-domain equivalent is pages/site/[host].tsx. */
export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (
    context
) => ({ props: await getProfileByUsername(context) });

export default ProfileView;
