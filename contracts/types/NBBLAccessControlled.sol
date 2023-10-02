// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.7.5;

import "./../interfaces/INBBLAuthority.sol";

abstract contract NBBLAccessControlled {
    /* ========== EVENTS ========== */

    event AuthorityUpdated(INBBLAuthority indexed authority);

    string UNAUTHORIZED = "UNAUTHORIZED"; // save gas

    /* ========== STATE VARIABLES ========== */

    INBBLAuthority public authority;

    /* ========== Constructor ========== */

    constructor(INBBLAuthority _authority) {
        authority = _authority;
        emit AuthorityUpdated(_authority);
    }

    /* ========== MODIFIERS ========== */

    modifier onlyGovernor() {
        require(msg.sender == authority.governor(), UNAUTHORIZED);
        _;
    }

    modifier onlyGuardian() {
        require(msg.sender == authority.guardian(), UNAUTHORIZED);
        _;
    }

    modifier onlyPolicy() {
        require(msg.sender == authority.policy(), UNAUTHORIZED);
        _;
    }

    modifier onlyVault() {
        require(msg.sender == authority.vault(), UNAUTHORIZED);
        _;
    }

    /* ========== GOV ONLY ========== */

    function setAuthority(INBBLAuthority _newAuthority)
        external
        onlyGovernor
    {
        authority = _newAuthority;
        emit AuthorityUpdated(_newAuthority);
    }
}
