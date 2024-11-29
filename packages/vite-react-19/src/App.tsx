import type { SxProps } from "@mui/joy/styles/types";
import { Box, Button, Card, Typography } from "@mui/joy";
import useEventCallback from "@mui/utils/useEventCallback";
import {
  QueryClient,
  QueryClientProvider,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { sxUtils } from "@utils/sx";
import { type FC, Suspense, useMemo } from "react";
import { createBrowserRouter, useSearchParams } from "react-router";
import { RouterProvider } from "react-router/dom";
import {
  createBrowserRouter as createBrowserRouter6,
  RouterProvider as RouterProvider6,
  useSearchParams as useSearchParams6,
} from "react-router-dom-6";

const styles = {
  container: {
    ...sxUtils.flexFill,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: 16,
    maxWidth: 800,
  },
  card: (theme) => ({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: theme.spacing(2),
  }),
} satisfies Record<PropertyKey, SxProps>;

const Demo: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const count = useMemo(
    () => Number(searchParams.get("count")) || 0,
    [searchParams],
  );
  const inc = useEventCallback(() => {
    setSearchParams({ count: String(count + 1) });
  });
  return (
    <>
      <Typography>{count}</Typography>
      <Button onClick={inc}>+</Button>
    </>
  );
};
const Loading: FC = () => {
  const [searchParams] = useSearchParams();
  const count = Number(searchParams.get("count")) || 0;
  useSuspenseQuery({
    queryKey: [
      {
        component: "Loading",
        count,
      },
    ],
    queryFn: async () =>
      await new Promise((resolve) => setTimeout(() => resolve(null), 1000)),
  });
  return null;
};
const SafeLoading: FC = () => {
  return (
    <Suspense fallback={"Loading"}>
      <Loading />
    </Suspense>
  );
};
const Demo6: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams6();
  const count = useMemo(
    () => Number(searchParams.get("count")) || 0,
    [searchParams],
  );
  const inc = useEventCallback(() => {
    setSearchParams({ count: String(count + 1) });
  });
  return (
    <>
      <Typography>{count}</Typography>
      <Button onClick={inc}>+</Button>
    </>
  );
};

const Loading6: FC = () => {
  const [searchParams] = useSearchParams6();
  const count = Number(searchParams.get("count")) || 0;
  useSuspenseQuery({
    queryKey: [
      {
        component: "Loading6",
        count,
      },
    ],
    queryFn: async () =>
      await new Promise((resolve) => setTimeout(() => resolve(null), 1000)),
  });
  return null;
};

const SafeLoading6: FC = () => {
  return (
    <Suspense fallback={"Loading"}>
      <Loading6 />
    </Suspense>
  );
};

const router = createBrowserRouter(
  [
    {
      index: true,
      element: (
        <>
          <Demo />
          <SafeLoading />
        </>
      ),
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

const router6 = createBrowserRouter6(
  [
    {
      index: true,
      element: (
        <>
          <Demo6 />
          <SafeLoading6 />
        </>
      ),
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={styles.container}>
        <Card sx={styles.card}>
          <Typography level="h1">react-router 7</Typography>
          <RouterProvider router={router} />
        </Card>
        <Card sx={styles.card}>
          <Typography level="h1">
            react-router 6 with v7_startTransition
          </Typography>
          <RouterProvider6
            router={router6}
            future={{
              v7_startTransition: true,
            }}
          />
        </Card>
        <Card sx={styles.card}>
          <Typography level="h1">react-router 6</Typography>
          <RouterProvider6 router={router6} />
        </Card>
      </Box>
    </QueryClientProvider>
  );
};

export default App;
