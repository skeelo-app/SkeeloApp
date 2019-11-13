import { TestBed } from '@angular/core/testing';
import { UserApiService } from './user-api.service';
describe('UserApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(UserApiService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=user-api.service.spec.js.map