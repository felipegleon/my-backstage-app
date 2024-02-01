import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { MyComponent } from '../ExampleFetchComponent';

const supportButtonItems = [
  {
    title: 'Issues',
    icon: 'dashboard',
    links: [{
      title: 'Support Backlog DevOps',
      url: 'https://grupobancolombia.visualstudio.com/Soporte%20Ingenier%C3%ADa%20de%20TI/_sprints/backlog/Soporte%20Ingenieria%20de%20SW%20-%20DevExp/Soporte%20Ingenier%C3%ADa%20de%20TI/Sprint%20184'
    }]
  }
]
export const ExampleComponent = () => (
  <Page themeId="tool">

    <Header title="Welcome to DevOps Tools!">
      <HeaderLabel label="Owner" value="DevOps Team" />
    </Header>

    <Content>
      <Grid container spacing={3} direction="column">

        <Grid item>
          <InfoCard>
            <ContentHeader title="Objetivo">
              <SupportButton items={supportButtonItems}>
                Para cualquier duda e inquitud puede dirigirse al backlog de soporte del equipo DevOps
              </SupportButton>
            </ContentHeader>
            <Typography variant="body1">
              Con el fin agilizar procesos, evitar malas practicas y actos inescrupulosos, se han habilitado un conjunto de herramientas para las diferentes plataformas del banco.
            </Typography>
          </InfoCard>
        </Grid>

        <Grid item>
          <MyComponent />
        </Grid>

      </Grid>
    </Content>

  </Page>
);
