import { getTeamInfo } from "@/queries/teams";
import { dbConnect } from "@/service/mongo";

export const GET = async (req, res) => {
  try {
    const { id } = await req.json();

    await dbConnect();

    const team = await getTeamInfo();
    console.log(team);
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
