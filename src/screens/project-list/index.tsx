import {SearchPanel} from "screens/project-list/search-panel";
import {List} from "screens/project-list/list";
import {useEffect, useState} from "react";
import {cleanObject, useDebounce, useMount} from "../../utils";
import {useHttp} from "../../utils/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debounceParam = useDebounce(param, 2000);
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const client = useHttp();
  useEffect(() => {
    client("projects", {data: cleanObject(debounceParam)}).then(setList)
  }, [debounceParam]);

  useMount(() => {
    client('users').then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam}/>
      <List users={users} list={list}/>
    </Container>
  );
}

const Container = styled.div`
  padding: 3.2rem
`;
