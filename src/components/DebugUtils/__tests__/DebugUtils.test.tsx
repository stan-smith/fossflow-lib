import React from 'react';
import { render, screen } from '@testing-library/react';
import { DebugUtils } from '../DebugUtils';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'src/styles/theme';
import { ModelProvider } from 'src/stores/modelStore';
import { SceneProvider } from 'src/stores/sceneStore';
import { UiStateProvider } from 'src/stores/uiStateStore';

describe('DebugUtils', () => {
  const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ThemeProvider theme={theme}>
      <ModelProvider>
        <SceneProvider>
          <UiStateProvider>
            {children}
          </UiStateProvider>
        </SceneProvider>
      </ModelProvider>
    </ThemeProvider>
  );

  it('renders without crashing', () => {
    render(
      <Providers>
        <DebugUtils />
      </Providers>
    );
    expect(screen.getByText('Mouse')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <Providers>
        <DebugUtils />
      </Providers>
    );
    expect(asFragment()).toMatchSnapshot();
  });
}); 