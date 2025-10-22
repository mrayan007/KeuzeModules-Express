import { MapperConfiguration } from "@dynamic-mapper/mapper";

import ModuleProfile from "./Profiles/ModuleProfile";
import UserProfile from "./Profiles/UserProfile";

const config = new MapperConfiguration(cfg => {
  cfg.addProfile(new ModuleProfile());
  cfg.addProfile(new UserProfile());
});

const mapper = config.createMapper();
export default mapper;