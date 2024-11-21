import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { GithubService } from '../service/github.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// Mock data
const mockUserInfo = {
  public_repos: 10,
  followers: 5,
  following: 2,
};

const mockRepos = [
  { name: 'repo1' },
  { name: 'repo2' },
];

const mockCommitActivity = [
  { week: 1672531200, total: 5 }, // Unix timestamp, 5 commits
  { week: 1672617600, total: 3 },
];

const mockRepoLanguages = {
  TypeScript: 5000,
  HTML: 2000,
};

// Mock GithubService
class MockGithubService {
  getUserInfo() {
    return of(mockUserInfo);
  }
  getRepos() {
    return of(mockRepos);
  }
  getCommitActivity() {
    return of(mockCommitActivity);
  }
  getRepoLanguages() {
    return of(mockRepoLanguages);
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: GithubService, useClass: MockGithubService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create the dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display user summary data', () => {
    fixture.detectChanges(); // Trigger ngOnInit
    expect(component.summary).toEqual({
      projects: mockUserInfo.public_repos,
      followers: mockUserInfo.followers,
      following: mockUserInfo.following,
    });
  });

  it('should process commits per month correctly', () => {
    fixture.detectChanges(); // Trigger ngOnInit

    // The commit activity spans two weeks, resulting in contributions for two months.
    expect(component.commitsPerMonth).toEqual(jasmine.arrayContaining([
      5, // January (index 0, 5 commits in the first week)
      3, // January (index 0, 3 commits in the second week)
    ]));
  });

  it('should aggregate languages across repositories', () => {
    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.languages).toEqual({
      TypeScript: 5000,
      HTML: 2000,
    });
  });
});
