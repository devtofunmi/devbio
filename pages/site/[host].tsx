import type { GetServerSideProps } from "next";
import ProfileView from "../../components/profile/ProfileView";
import { getProfileByDomain, type ProfilePageProps } from "../../lib/profileData";

/**
 * Middleware rewrites jay.dev/ to /site/jay.dev so the lookup happens here
 * rather than on the edge. A nested path on purpose: /[profile] is a single
 * segment, so this can never collide with a username.
 */
export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (
    context
) => ({ props: await getProfileByDomain(context) });

export default ProfileView;
