import {SearchPanel} from "screens/project-list/search-panel";
import {List} from "screens/project-list/list";
import {useState} from "react";
import {useDebounce, useDocumentTitle} from "../../utils";
import styled from "@emotion/styled";
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";
import {Button, Row, Typography} from "antd";
import {useProjectsSearchParams} from "screens/project-list/util";
import {useDispatch} from "react-redux";
import {store} from "../../store";
import {ButtonNoPadding} from "../../components/lib";
import {projectListActions} from "./project-list.slice";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectsSearchParams();
  const {isLoading, error, data: list, retry} = useProjects(useDebounce(param, 200));
  const {data: users} = useUsers();

  const dispatch = useDispatch();
  console.log(store.getState());

  return (
    <Container>
        <Row>
            <h1>项目列表</h1>
            <ButtonNoPadding onClick={() => dispatch(projectListActions.openProjectModal())}>
                创建项目
            </ButtonNoPadding>
        </Row>
        <SearchPanel users={users || []} param={param} setParam={setParam}/>
        {
            error? (
                <Typography.Text type={"danger"}>{error.message}</Typography.Text>
            ): null
        }
        <List
            refresh={retry}
            loading={isLoading}
            users={users || []}
            dataSource={list || []}
        />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem
`;
