import React, { useContext, useState } from 'react';
import { AuthenticationContext } from '../../../context/authentication.context';
import { CourseContext } from '../../../context/course.context';
import Body, { Main, SideBar } from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';
import PublicCourseFilter from './PublicCourseFilter';
import PublicCourseList from './PublicCourseList';

const PublicCourse = (props) => {
  const courseContext = useContext(CourseContext);
  const { verifyUser } = useContext(AuthenticationContext);
  const [fetched, setFetched] = useState(false);

  const onGetCourseList = async (settting) => {
    setFetched(false);
    await courseContext.getCourseList(settting, !!verifyUser());
    setFetched(true);
  }

  return (
    <>
      <NavigationBar
        nav={[
          ['Home', '/'],
          ['Courses'],
        ]}
      />
      <Body>
        <SideBar>
          <PublicCourseFilter
            onGetCourseList={onGetCourseList}
          />
        </SideBar>
        <Main>
          <PublicCourseList
            fetched={fetched}
            onGetCourseList={onGetCourseList}
          />
        </Main>
      </Body>
    </>
  );
}

export default PublicCourse;