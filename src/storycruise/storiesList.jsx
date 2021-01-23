import React from 'react';

import { StoryPage } from './StoryPage';
// import { getStories } from './getStories'; // virtual file
const storyModules = import.meta.globEager('../**/*.stories.jsx');

function transformStory(storyExport) {
  const config = storyExport.default;
  const compKeys = Object.keys(storyExport);
  const storyKeys = compKeys.filter((name) => name !== 'default');

  const stories = storyKeys.map((name) => {
    const Component = storyExport[name];
    const args = Component.args || {};
    const argTypes = Component.argTypes || {};

    return {
      name,
      Component,
      args,
      argTypes,
    };
  });

  const storyPageProps = {
    key: config.name,
    name: config.name,
    description: config.description,
    stories,
  }

  const route = {
    path: config.path,
    name: config.name,
    element: <StoryPage {...storyPageProps} />,
  };

  return route;
}

export function getRoutes() {
  const stories = Object.values(storyModules);
  const routes = stories.map(transformStory);

  return routes;
}
