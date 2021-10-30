import {SearchPanel} from "screens/project-list/search-panel";
import {List} from "screens/project-list/list";
import {useState} from "react";
import {useDebounce, useDocumentTitle} from "../../utils";
import styled from "@emotion/styled";
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";
import {Typography} from "antd";
import {useUrlQueryParam} from "../../utils/url";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const debounceParam = useDebounce(param, 2000);

  const {isLoading, error, data: list} = useProjects(debounceParam);
  const {data: users} = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam}/>
      {
        error? (
            <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        ): null
      }
      <List loading={isLoading} users={users || []} dataSource={list || []}/>
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem
`;
