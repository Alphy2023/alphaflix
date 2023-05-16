import CustomHelmet from "../components/common/CustomHelmet"
import HeroSlide from "../components/common/HeroSlide";
import tmdbConfigs from "../api/configs/tmdb.configs";
import { Box, Tab, Tabs} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide"
import {useState} from "react"
const HomePage = () => {
  const [popular, setPopular] = useState("movies");
  
  const [topRated, setTopRated] = useState("movies");
  const changePopular = (event, newValue) => {
    setPopular(newValue);
  };
  const changeTopRated = (event, newValue) => {
    setTopRated(newValue);
  };
  return (
    <>
      <CustomHelmet title="AlphyFlix" />

      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />

      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        {/* popular */}
        <Container header={`popular`}>
          <TabContext
            value={popular}
            textColor="text.primary"
            indicatorColor="text.primary"
            variant="body1"
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={changePopular}>
                <Tab value="movies" label="movies" />
                <Tab value="series" label="series" />
              </TabList>
            </Box>
            {/* popular movies */}
            <TabPanel value="movies">
              <MediaSlide
                mediaType={tmdbConfigs.mediaType.movie}
                mediaCategory={tmdbConfigs.mediaCategory.popular}
              />
            </TabPanel>
            {/* popular movies */}
            {/* popular series */}
            <TabPanel value="series">
              <MediaSlide
                mediaType={tmdbConfigs.mediaType.tv}
                mediaCategory={tmdbConfigs.mediaCategory.popular}
              />
            </TabPanel>
            {/* popular series */}
          </TabContext>
        </Container>
        {/* popular */}

        {/* top rated */}
        <Container header="top rated">
          <TabContext
            value={topRated}
            textColor="text.primary"
            indicatorColor="text.primary"
            variant="body1"
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={changeTopRated}>
                <Tab value="movies" label="movies" />
                <Tab value="series" label="series" />
              </TabList>
            </Box>
            {/* topRated movies */}
            <TabPanel value="movies">
              <MediaSlide
                mediaType={tmdbConfigs.mediaType.movie}
                mediaCategory={tmdbConfigs.mediaCategory.top_rated}
              />
            </TabPanel>
            {/* topRated movies */}
            {/* topRated series */}
            <TabPanel value="series">
              <MediaSlide
                mediaType={tmdbConfigs.mediaType.tv}
                mediaCategory={tmdbConfigs.mediaCategory.top_rated}
              />
            </TabPanel>
            {/* popular series */}
          </TabContext>
        </Container>
        {/* top rated */}
      </Box>
    </>
  );
}

export default HomePage
